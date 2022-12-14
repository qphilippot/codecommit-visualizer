import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.VUE_APP_AWS_REGION,
    accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_AWS_SECRET_KEY_ID
});

const codecommit = new AWS.CodeCommit();

export function getAllRepositories() {
    return new Promise((resolve, reject) =>  {
        codecommit.listRepositories({}, function (err, data) {
            if (err) {
                return reject(err);
            }

            resolve(data?.repositories.map(repository => ({
                name: repository.repositoryName,
                id: repository.repositoryId
            })));
        });
    });
}

export function getRepositoryByName(name) {
    return new Promise((resolve, reject) =>  {
        codecommit.getRepository({
            repositoryName: name
        }, function (err, data) {
            if (err) {
                return reject(err);
            }

            resolve(data.repositoryMetadata);
        });
    });
}

export function getOpenPullRequest(name) {
    return new Promise((resolve, reject) =>  {
        codecommit.listPullRequests({
            repositoryName: name,
            pullRequestStatus: 'OPEN'
        }, function (err, data) {
            if (err) {
                return reject(err);
            }

            Promise.all(data.pullRequestIds.map(pullRequestId => {
                return new Promise(resolvePR => {
                    codecommit.getPullRequest({
                        pullRequestId
                    }, function (err2, { pullRequest }) {
                        if (err2) console.error(err2)
                        resolvePR(pullRequest);
                    });
                });
            })).then(resolve)
        });
    });
}
