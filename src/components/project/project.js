export {Project};

class Project {
    #id;
    title;
    #toDos = [];

    static fromJSON(data) {
        return new this(data.title, data.Id);
    }

    constructor(title, id = null, toDos = null) {
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        this.#id = id ?? (crypto.randomUUID?.() ?? this.#generateUUID());
        this.title = title;
        this.#toDos = toDos ?? [];
    }

    get Id() {
        return this.#id;
    }

    add(toDos) {
        this.#toDos.push(...toDos);
    }

    remove(toDos) {
        this.#toDos = this.#toDos.filter(
            (td) => !toDos.some((removableToDo) => removableToDo.Id == td.Id)
        );
    }

    removeAll() {
        this.#toDos = [];
    }

    get ToDos() {
        return [...this.#toDos.values()];
    }

    toJSON() {
        return {
            "Id" : this.Id,
            "title" : this.title,
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