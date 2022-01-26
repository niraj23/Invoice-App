class AuthenticationTokenService
  HMAC_SECRET = 'youfoundmysecretkey'
  ALGORITHM_TYPE = 'HS256'.freeze

  def self.encode(user_id)
    payload = { user_id: user_id }

    JWT.encode payload, HMAC_SECRET, ALGORITHM_TYPE
  end

  def self.decode(token)
    decoded_token = JWT.decode token, HMAC_SECRET, false, { algorithm: ALGORITHM_TYPE }
    decoded_token.first['user_id']
  end
end
