export class Submission {
    image;
    code: string;
    output: String;
    name: String;
    templateID: number;
  
    constructor() {
      this.image = "https://www.maxpixel.net/static/photo/1x/Photoshop-Coding-Code-Programming-Php-Web-Symbol-3647303.jpg";
      this.code = "int main(){}";
      this.output = "out";
      this.name = "John Smith"
      this.templateID = 0;
    }
  }