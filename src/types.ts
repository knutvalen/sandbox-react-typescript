export interface Contact {
    readonly firstName: string;
    readonly lastName: string;
  }

//   export interface StoreState {
//       readonly project: {
//         name: string,
//         monday: number,
//         tuesday: number,
//         wednesday: number,
//         thursday: number,
//         friday: number,
//         saturday: number,
//         sunday: number
//     };
//   }

export interface AppState {
    readonly firstName: string;
    readonly lastName: string;
    readonly contacts: Contact[];
  }

 export enum ActionTypes {
    FirstNameChanged = "FIRST_NAME_CHANGED",
    LastNameChanged = "LAST_NAME_CHANGED",
    AddContact = "ADD_CONTACT",
  };