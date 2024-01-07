module.exports = {
    MeiliSearch: function() {
        return {
            index: function (object) {
                return {
                    updateFilterableAttributes: async function (attributes) {
                        // Mock implementation here
                    },
                };
            },
            createKey: async function (object) {
                return {
                };
            },
        };
    }
}

