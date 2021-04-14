import { Server, Model } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

    let server = new Server({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", { name: "renan", email: 'renan@dell.com', password: '' })
            server.create("user", { name: "yan", email: 'yan@dell.com', password: '' })
        },

        routes() {

            this.namespace = "api"

            this.get("/users", schema => {
                return schema.user.all()
            })

        },
    })

    return server
}
