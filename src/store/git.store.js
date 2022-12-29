import {defineStore} from 'pinia';
import {
    batchGetPullRequest,
    getAllRepositories,
    getOpenPullRequest,
    getRepositoryByName,
    getDiff,
    getPullRequest, loadContentById
} from '@/services/git.service'
import {ref} from "vue";

export const useGitStore = defineStore('git', {
    state: () => {
        return {
            _repositories: [],
            _repositoryDetail: {},
            _pendingPR: [],
            _pullRequests: {},
            _content: {},
            lastPullRequestSync: 0,
            _lastSync: 0,
            _changes: [],
            isLoading: false
        }
    },

    getters: {
        repositories: state => state._repositories,
        repositoryDetails: (state) => {
            return (repositoryName) => {
                return  state._repositoryDetail[repositoryName]
            }
        },

        changes: (state) => state._changes,

        allPullRequests: state => state._pullRequests,
        lastPullRequestSync: state => state._lastSync,
        pullRequestByRepositoryAndId: state => {
          return ({repository, pullRequestId}) => {
              return state._pullRequests[`${repository}-${pullRequestId}`];
          }
        },

        lastSynchronize: state => state._lastSync,
        openPullRequests: state => state._pendingPR,
        openPullRequestsByRepository: state => {
            return repositoryName => state._pendingPR.filter(pr => pr.pullRequestTargets?.[0].repositoryName === repositoryName)
        },
        contentById: state => {
            return (id, repository) => {
                return  state._content[`${repository}-${id}`] ?? 'still loading';
            }
        }
    },

    actions:
        {
            recordPullRequestInStore(pullRequestArray) {
                pullRequestArray.forEach(pr => this._pullRequests[`${pr.repository}-${pr._id}`] = ref(pr));
            },

            refresh() {
                getAllRepositories().then(repos => {
                    this._lastSync = Date.now();
                    this._repositories.length = 0;
                    this._pendingPR.length = 0;
                    repos.forEach(entry => {
                        this._repositories.push(entry)
                        getOpenPullRequest(entry.name).then(pr => {
                            pr.forEach(_pr => {
                                this._pendingPR.push(_pr);
                            });

                            batchGetPullRequest(pr.map(p => p.pullRequestId)).then(data => {
                             this.recordPullRequestInStore(data);
                            }).catch(console.error);
                        })
                    });
                });
            },

            refreshRepositoriesList() {
                getAllRepositories().then(repos => {
                    this._lastSync = Date.now();
                    this._repositories.length = 0;
                    this._pendingPR.length = 0;
                    repos.forEach(entry => {
                        this._repositories.push(entry)
                        getOpenPullRequest(entry.name).then(pr => {
                            pr.forEach(_pr => {
                                this._pendingPR.push(_pr);
                            });
                        })
                    });
                });
            },

            loadRepositoryDetails(repo) {
                getRepositoryByName(repo).then(details => {
                    this._repositoryDetail[repo] = details;
                });
            },

            async loadDifferenceInvolvedByPullRequest({repository, pullRequestId}) {
                if (typeof this._pullRequests[`${repository}-${pullRequestId}`] === 'undefined') {
                    await getPullRequest(pullRequestId).then(pullRequest => {
                        this.recordPullRequestInStore([ pullRequest ]);
                    });
                }

                const pullRequest = this._pullRequests[`${repository}-${pullRequestId}`];
                await this.loadDifferenceBetweenCommits(pullRequest)
            },

            loadDifferenceBetweenCommits(settings) {
                this._isLoading = true;
                this._changes.length = 0;
                getDiff(settings).then(data => {
                    data.forEach(entry => {
                        this._changes.push(entry);
                    });

                    this._isLoading = false;
                })
            },

            async loadContent(id, repository) {
                const key = `${repository}-${id}`;
                if (typeof this._content[key] === 'undefined') {
                    await loadContentById(id, repository).then(content => {
                        this._content[key] = ref(content);
                    });
                }
            }
        }


})
