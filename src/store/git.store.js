import {defineStore} from 'pinia';
import {getAllRepositories, getRepositoryByName} from '@/services/git.service'

export const useGitStore = defineStore('git', {
    state: () => {
        return {
            _repositories: [],
            _repositoryDetail: {}
        }
    },

    getters: {
        repositories: state => state._repositories,
        repositoryDetails: (state) => {
            return (repositoryName) => {
                return  state._repositoryDetail[repositoryName]
            }
        }
    },

    actions:
        {
            refreshRepositoriesList() {
                getAllRepositories().then(repos => {
                    console.log(repos);
                    this._repositories.length = 0;
                    repos.forEach(entry => {
                        this._repositories.push(entry)
                    });

                    console.log(this._repositories)
                });
            }
            ,

            loadRepositoryDetails(repo) {
                console.log('loadRepositoryDetails', repo)
                getRepositoryByName(repo).then(details => {
                    this._repositoryDetail[repo] = details;
                });
            }
        }


})
