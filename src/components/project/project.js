export class Project {
    #id;
    title;
    #toDosIds = [];
    icon;

    static fromJSON(data) {
        return new this(data.title, data.Id, data.toDosIds, data.icon);
    }

    constructor(title, id = null, toDosIds = null, icon = null) {
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        this.#id = id ?? (crypto.randomUUID?.() ?? this.#generateUUID());
        this.title = title;
        this.#toDosIds = toDosIds ?? [];
        this.icon = icon ?? null;
    }

    get Id() {
        return this.#id;
    }

    add(toDosIds) {
        this.#toDosIds.push(...toDosIds);
    }

    remove(toDosIds) {
        this.#toDosIds = this.#toDosIds.filter(
            (tdId) => !toDosIds.some((removableToDoId) => removableToDoId == tdId)
        );
    }

    removeAll() {
        this.#toDosIds = [];
    }

    get ToDosIds() {
        return [...this.#toDosIds.values()];
    }

    toJSON() {
        return {
            "Id" : this.Id,
            "title" : this.title,
            "toDosIds" : this.#toDosIds,
            "icon" : this.icon,
        };
    }

    #generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}