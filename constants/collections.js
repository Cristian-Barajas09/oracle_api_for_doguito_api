const METADATA = {
    "keyColumn": {
        "name": "ID",
        "assignmentMethod": "UUID"
    },
    "contentColumn": {
        "name": "JSON_DOCUMENT",
        "sqlType": "BLOB"
    },

    "versionColumn": {
        "name": "VERSION",
        "method": "UUID"
    },
    "lastModifiedColumn": {
        "name": "LAST_MODIFIED"
    },
    "creationTimeColumn": {
        "name": "CREATED_ON"
    }
}


module.exports = METADATA