export class Template {
    templateID: number;
    name: string;
    content: string;
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
