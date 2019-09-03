export class User {
    constructor(
    public username:string,
    public avatar:string,
    public followers:number,
    public following:number,
    public repos:number,
    public createdDate:Date
    
    ){}
}
