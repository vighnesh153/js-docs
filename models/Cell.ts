import { v4 as uuid } from 'uuid';

export type CellType = 'code' | 'text';

export interface ICell {
  id: string;
  type: CellType;
  content: string;
}

class Cell {
  static deserialize = ({ id, type, content }: ICell): Cell => {
    return new Cell(id, type, content);
  };

  get id() {
    return this._id;
  }
  get type() {
    return this._type;
  }
  get content() {
    return this._content;
  }

  constructor(
    private _id: string,
    private _type: CellType,
    private _content: string
  ) {}

  clone = () => {
    const newId = uuid();
    return new Cell(newId, this.type, this.content);
  };

  setContent = (content: string): Cell => {
    this._content = content;
    return this;
  };

  serialize = (): ICell => {
    const { id, type, content } = this;
    return { id, type, content };
  };
}

export default Cell;
