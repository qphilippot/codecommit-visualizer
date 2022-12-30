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

function buildPullRequestObject(pullRequest, conflict) {
    const { title, description } = pullRequest;
    return  {
        author: pullRequest.authorArn,
        created_at: pullRequest.creationDate,
        updated_at: pullRequest.lastActivityDate,
        sourceCommit:pullRequest.pullRequestTargets[0].destinationCommit,
        destinationCommit:pullRequest.pullRequestTargets[0].sourceCommit,
        _id: pullRequest.pullRequestId,
        status: pullRequest.pullRequestStatus,
        conflict,
        repository: pullRequest.pullRequestTargets[0].repositoryName,
        title,
        description
    };
}
export function getPullRequest(pullRequestId) {
    return new Promise((resolve, reject) =>  {
        codecommit.getPullRequest({
            pullRequestId
        }, async function (err, data) {
            if (err) {
                return reject(err);
            }

            const content = data.pullRequest;
            let conflict = [];

            if (content.pullRequestTargets[0].destinationCommit === content.pullRequestTargets[0].sourceCommit) {
                conflict.push('Differences between the source branch and the destination branch cannot be displayed for this pull request. Either the source branch has no commits, has had its tip reset to the same commit as the destination branch, or the source branch has been orphaned. To fix this problem, commit and push some code to the source branch, reset the tip of the source branch, or close this pull request and create another.');
                return resolve(buildPullRequestObject(content, conflict));
            }


            codecommit.getMergeConflicts({
                destinationCommitSpecifier: content.pullRequestTargets[0].destinationCommit,
                mergeOption: "THREE_WAY_MERGE",
                sourceCommitSpecifier: content.pullRequestTargets[0].sourceCommit,
                repositoryName: content.pullRequestTargets[0].repositoryName

            }, async function (err2, conflictData) {
                if (err2) console.error(err2);

                if (!conflictData.mergeable) {
                        conflict = conflictData.conflictMetadataList;
                }

                resolve(buildPullRequestObject(content, conflict));
            });


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
