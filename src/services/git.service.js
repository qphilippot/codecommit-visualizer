import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.VUE_APP_AWS_REGION,
    accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_AWS_SECRET_KEY_ID
});

const codecommit = new AWS.CodeCommit();

export function getDiff({ sourceCommit, destinationCommit, repository }) {
    return new Promise((resolve, reject) =>  {
        codecommit.getDifferences({
            afterCommitSpecifier: destinationCommit,
            beforeCommitSpecifier: sourceCommit,
            repositoryName: repository
        }, function (err, { differences}) {
            if (err) {
                return reject(err);
            }

            resolve(differences);
        });
    });
}

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

export function batchGetPullRequest(pullRequestIdArray) {
    return Promise.all(pullRequestIdArray.map(getPullRequest));
}

export function loadContentById(contentId, repository) {
    return new Promise((resolve, reject) =>  {
        codecommit.getBlob({
            blobId: contentId,
            repositoryName: repository
        }, function (err, data) {
            if (err) {
                return reject(err);
            }


           resolve(new TextDecoder("utf-8").decode(data.content));
        });
    });
}
export function getPullRequest(pullRequestId) {
    return new Promise((resolve, reject) =>  {
        codecommit.getPullRequest({
            pullRequestId
        }, function (err, data) {
            if (err) {
                return reject(err);
            }

            const content = data.pullRequest;
            const { title, description } = content;
            const pr = {
                author: content.authorArn,
                created_at: content.creationDate,
                updated_at: content.lastActivityDate,
                sourceCommit:content.pullRequestTargets[0].destinationCommit,
                destinationCommit:content.pullRequestTargets[0].sourceCommit,
                _id: content.pullRequestId,
                status: content.pullRequestStatus,
                repository: content.pullRequestTargets[0].repositoryName,
                title,
                description
            };
            resolve(pr);
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
                console.error(err);
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
