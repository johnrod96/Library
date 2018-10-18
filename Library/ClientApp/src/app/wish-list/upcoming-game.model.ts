export class UpcomingGameModel{
    public title: string;
    public description: string;
    public imagePath: string;
    public platform: string;
    public dateReleaseMonth: number;
    public dateReleaseDay: number;
    public dateReleaseYear: number;

    constructor(title: string, description: string, imagePath: string, platform:string, dateReleaseMonth: number, dateReleaseDay: number, dateReleaseYear: number){
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.platform = platform;
        this.dateReleaseMonth = dateReleaseMonth;
        this.dateReleaseDay = dateReleaseDay;
        this.dateReleaseYear = dateReleaseYear;
    }
}