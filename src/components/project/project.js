export {Project};

class Project {
    #id;
    title;
    notes;
    #toDos = [];

    constructor(title, notes) {
        if (typeof title !== 'string' || title.length <= 0){
            throw new Error("Title must be a valid string");
        }

        if (typeof notes !== 'string' || notes.length <= 0){
            throw new Error("Notes must be a valid string");
        }

        this.#id = crypto.randomUUID();
        this.title = title;
        this.notes = notes;
    }

    get Id() {
        return this.#id;
    }

    add(toDos) {
        this.#toDos.push(...toDos);
    }

    remove(toDos) {
        this.#toDos = this.#toDos.filter((td) => !toDos.incluudes(td.Id))
    }

    get ToDos() {
        return [...this.#toDos.values()];
    }
}