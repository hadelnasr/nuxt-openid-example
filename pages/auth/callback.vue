<template>
  <div>
    <h1>Processing ......</h1>
    <br/>
  </div>
</template>

<script>

export default {
  name: "home",
  asyncData(context) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    const data = new URLSearchParams();

    data.append('grant_type', 'authorization_code');
    data.append('code', context.query.code);
    data.append('redirect_uri', process.env.CUSTOM_OPENID_REDIRECT_URI);
    data.append('client_id', process.env.CUSTOM_OPENID_CLIENT_ID);
    data.append('client_secret', process.env.CUSTOM_OPENID_CLIENT_SECRET);
    data.append('scope', process.env.CUSTOM_OPENID_SCOPE);

    context.$axios.$post(process.env.CUSTOM_OPENID_TOKEN_ENDPOINT, data)
        .then(response => {
          // Access token is in response.data.access_token
          // const accessToken = response.access_token;
          console.log('Access Token:', JSON.stringify(response));
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
  }
}
</script>