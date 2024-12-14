export interface IResetPassword{
    "code":string
}
export interface IChangePassword{
    "password":string,"confirm_password":string,"code":string 
}