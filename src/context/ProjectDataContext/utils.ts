import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase/firebase";

type Column = {
  [key: string]: {
    name: string;
    cards: Card[];
  };
};

type Todo = {
  title: string;
  isCompleted: boolean;
};

class Card {
  whichList: string = "To do";
  title: string = "";
  description?: string = "";
  schedule?: any;
  tags?: string[] = [];
  todos?: Todo[];
  id: string = "";

  constructor(
    id: string,
    title: string,
    whichList: string,
    description?: string,
    schedule?: Date,
    tags?: string[],
    todos?: Todo[]
  ) {
    this.id = id;
    this.whichList = whichList;
    this.title = title;
    this.description = description = "";
    this.schedule = schedule || null;
    this.tags = tags || [];
    this.todos = todos || [];
  }
}

const getFormattedProjectCards = (fromBackend: Card[]) => {
  return fromBackend.reduce<Column>((columnNames, data) => {
    if (Object.keys(columnNames).indexOf(data.whichList) === -1) {
      columnNames[data.whichList] = { name: "", cards: [] };
    }
    columnNames[data.whichList] = {
      name: data.whichList,
      cards: [...columnNames[data.whichList].cards, data],
    };
    return columnNames;
  }, {});
};

const getUnFormattedProjectCards = (columns: Column) => {
  const cards: Card[] = [];
  Object.keys(columns).map((listName) => {
    columns[listName].cards.forEach((card) => {
      cards.push(card);
    });
  });
  return cards;
};

async function getProjectCards(projectId: string) {
  let cards: any = [];
  const cardRef = collection(db, `projects/${projectId}/cards`);
  const cardSnap = await getDocs(cardRef);
  cardSnap.forEach((doc) => {
    cards.push({ ...doc.data(), id: doc.id });
  });
  return getFormattedProjectCards(cards);
}

const Tags: { [key: string]: string } = {
  red: "bg-tag-red",
  yellow: "bg-tag-yellow",
  green: "bg-tag-green",
  purple: "bg-tag-purple",
  blue: "bg-tag-blue",
  cyan: "bg-tag-cyan",
};

const onGoingCards: Card[] = [
  {
    description: "implementing character movements, writing a script",
    schedule: {
      seconds: 1647939600,
      nanoseconds: 0,
    },
    whichList: "Ongoing",
    title: "Character movements",
    tags: ["red", "green", "purple", "yellow", "cyan", "blue"],
    todos: [
      {
        title: "character jump",
        isCompleted: true,
      },
      {
        title: "character strafe",
        isCompleted: false,
      },
      {
        title: "character shoot",
        isCompleted: false,
      },
    ],
    id: "iI5aE9WGAEHiBZf8Mkcx",
  },
  {
    // description: "implementing character movements, writing a script",
    // schedule: {
    //   seconds: 1647939600,
    //   nanoseconds: 0,
    // },
    whichList: "Ongoing",
    title: "Character movements",
    // tags: ["red", "green"],
    // todos: [
    //   {
    //     title: "character jump",
    //     isCompleted: true,
    //   },
    //   {
    //     title: "character strafe",
    //     isCompleted: false,
    //   },
    // ],
    id: "iI5aE9WGAEHiBzf8Mkcx",
  },
];

const completedCards: Card[] = [
  {
    description: "implementing character movements, writing a script",
    schedule: {
      seconds: 1647939600,
      nanoseconds: 0,
    },
    whichList: "Completed",
    title: "Character movements",
    tags: ["red", "green"],
    todos: [
      {
        title: "character jump",
        isCompleted: true,
      },
      {
        title: "character strafe",
        isCompleted: false,
      },
    ],
    id: "iI5aE9WGAEHiBZf8Mkco",
  },
];

const dummyData = [
  {
    title: "Character movements",
    todos: [
      {
        isCompleted: true,
        title: "character jump",
      },
      {
        title: "character strafe",
        isCompleted: false,
      },
    ],
    tags: ["red", "green"],
    whichList: "Ongoing",
    schedule: {
      seconds: 1647939600,
      nanoseconds: 0,
    },
    description: "implementing character movements, writing a script",
    id: "iI5aE9WGAEHiBZf8Mkcx",
  },
  {
    title: "Character movements",
    todos: [
      {
        isCompleted: true,
        title: "character jump",
      },
      {
        title: "character strafe",
        isCompleted: false,
      },
    ],
    tags: ["red", "green"],
    whichList: "Ongoing",
    schedule: {
      seconds: 1647939600,
      nanoseconds: 0,
    },
    description: "implementing character movements, writing a script",
    id: "iI5aE9WGAEHiBZf8Mkcx",
  },
  ...completedCards,
  ...onGoingCards,
];

export { getProjectCards, getUnFormattedProjectCards, Card, Tags };
export type { Column };
