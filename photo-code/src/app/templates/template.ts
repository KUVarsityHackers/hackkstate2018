export class Template {
    templateID: number;
    name: String;
    content: String;
    language: String;
    output: String;

    constructor(){
        this.name = "name";
        this.language = "C++";
        this.content = 
`int main(){
    [PHOTOCODE REPLACE]
    return 0;
}`;
        this.output = "0";
    }
}
