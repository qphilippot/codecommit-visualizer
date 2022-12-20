import {defineStore} from 'pinia';
import {
    batchGetPullRequest,
    getAllRepositories,
    getOpenPullRequest,
    getRepositoryByName
} from '@/services/git.service'
import {ref} from "vue";

export const useGitStore = defineStore('git', {
    state: () => {
        return {
            _repositories: [],
            _repositoryDetail: {},
            _pendingPR: [],
            _pullRequests: {},
            lastPullRequestSync: 0,
            _lastSync: 0
        }
    },

    getters: {
        repositories: state => state._repositories,
        repositoryDetails: (state) => {
            return (repositoryName) => {
                return  state._repositoryDetail[repositoryName]
            }
        },

        allPullRequests: state => state._pullRequests,
        lastPullRequestSync: state => state._lastSync,

        lastSynchronize: state => state._lastSync,
        openPullRequests: state => state._pendingPR,
        openPullRequestsByRepository: state => {
            return repositoryName => state._pendingPR.filter(pr => pr.pullRequestTargets?.[0].repositoryName === repositoryName)
        }
    },

    actions:
        {
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
                                data.forEach(pr => this._pullRequests[`${pr.repository}-${pr._id}`] = ref(pr));
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
            }
        }


})
