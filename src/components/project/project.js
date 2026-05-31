export {Project};

class Project {
    #id;
    title;
    notes;
    color;
    #toDos = [];

    static fromJSON(data) {
        return new this(data.title, data.notes, data.color, data.Id);
    }

    constructor(title, notes, color, id = null, toDos = null) {
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        if (typeof notes !== 'string' || notes.length <= 0){
            throw new Error("Notes must be a valid string");
        }

        this.#id = id ?? crypto.randomUUID();
        this.title = title;
        this.notes = notes;
        this.color = color;
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
            "notes" : this.notes,
            "color" : this.color,
        };
    }
}