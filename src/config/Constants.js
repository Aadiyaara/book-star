export const AuthMode = {
    LOGIN: 'LOGIN', 
    REGISTER: 'REGISTER'
}

export const FILTER_COLLECTION_HEADINGS = (filter, order) => {
    switch(filter) {
        case 'title': 
            return order === 'ASC' ? 'A to Z' : ' Z to A'
        case 'createdAt':
            return order === 'DSC' ? 'NEWEST ADDTIONS' : ' OLD SCHOOL'
        case 'updatedAt':
            return order === 'DSC' ? 'More Pages added on' : ' Stale ones'
        default:
            return
    }
}

export const LandingCategories = ['title', 'createdAt', 'updatedAt']