import APIService from "./api.service";

const IssuesService = {
    getIssues() {
        return APIService.get('issues');
    }
};

export default IssuesService;
