export class Game{
public title: string;
public imagePath: string;
public description: string;
public platform: string;
public review: number;
public reviewDetails: string;

    constructor(title: string, imagePath: string, description: string, platform: string, review: number, reviewDetails){
        this.title = title;
        this.imagePath = imagePath;
        this.description = description;
        this.platform = platform;
        this.review = review;
        this.reviewDetails = reviewDetails;
    }
}