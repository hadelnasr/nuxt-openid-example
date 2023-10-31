import Oauth2Scheme from '@/.nuxt/auth/schemes/oauth2'
import { encodeQuery} from '@/.nuxt/auth/utilities'

export default class CustomAuthScheme extends Oauth2Scheme {
    login (params) {
        const opts = {
            protocol: 'oauth2',
            response_type: this.options.response_type,
            access_type: this.options.access_type,
            client_id: this.options.client_id,
            redirect_uri: this._redirectURI,
            scope: this._scope,
            // Note: The primary reason for using the state parameter is to mitigate CSRF attacks.
            // https://auth0.com/docs/protocols/oauth2/oauth-state
            // state: state || nanoid(),
            ...params
        }

        if (this.options.audience) {
            opts.audience = this.options.audience
        }

        // Set Nonce Value if response_type contains id_token to mitigate Replay Attacks
        // More Info: https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
        // More Info: https://tools.ietf.org/html/draft-ietf-oauth-v2-threatmodel-06#section-4.6.2
        if (opts.response_type.includes('id_token')) {
            // nanoid auto-generates an URL Friendly, unique Cryptographic string
            // Recommended by Auth0 on https://auth0.com/docs/api-auth/tutorials/nonce
            opts.nonce = nonce || nanoid()
        }

        this.$auth.$storage.setUniversal(this.name + '.state', opts.state)

        const url = this.options.authorization_endpoint + '?' + encodeQuery(opts)

        window.location = url
    }
}
