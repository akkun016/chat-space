module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Dvise.mappings[:user]
    sign_in user
  end
end