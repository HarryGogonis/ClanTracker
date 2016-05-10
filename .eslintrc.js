module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "import/no-unresolved": [2, { "ignore": ["^meteor/"] }]
    }
};
