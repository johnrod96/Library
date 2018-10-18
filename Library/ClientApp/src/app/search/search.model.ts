export class Search{
    name: string;
    summary: string;
    imagePath: string;
    rating: number;

    constructor(name: string, summary: string, imagePath: string, rating: number){
        this.name = name;
        this.summary = summary;
        this.imagePath = imagePath;
        this.rating = Math.ceil(rating);
    }
}