import { EASx } from "./eas";
import { TopicStore } from "./topic";

const easAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

export class EFS {

    public EAS: EASx;
    public TopicStore: TopicStore;

    constructor(address: string) {

        this.EAS = new EASx(address);
        this.TopicStore = new TopicStore(this);
    }
}