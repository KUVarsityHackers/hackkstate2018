export class Template {
    name: String;
    language: String;
    code: String;
    output: String;

    constructor(){
        this.name = "name";
        this.language = "C++";
        this.code = 
`int main(){
    [PHOTOCODE REPLACE]
    return 0;
}`;
        this.output = "0";
    }
}
