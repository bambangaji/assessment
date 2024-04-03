export class DummyModel {
    id: number;
    albumId: Number;
    title: string;
    url: string;
    thumbnailUrl: string;

    constructor(data: DummyModel) {
        this.id = data.id;
        this.albumId = data.albumId;
        this.title = data.title;
        this.thumbnailUrl = data.thumbnailUrl;
        this.url = data.url;
    }
}
