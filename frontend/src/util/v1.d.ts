/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/health": {
    get: operations["AppController_getHealth"];
  };
  "/api/profile": {
    get: operations["UserController_getProfile"];
  };
  "/api/user/{username}": {
    get: operations["UserController_getOneUser"];
    patch: operations["UserController_updateUser"];
  };
  "/api/connections/minecraft": {
    post: operations["ConnectionController_addMinecraft"];
    delete: operations["ConnectionController_removeMinecraft"];
  };
  "/api/groups/{id}": {
    get: operations["GroupController_getById"];
  };
  "/api/groups": {
    get: operations["GroupController_getAll"];
    post: operations["GroupController_createGroup"];
  };
  "/api/groups/{id}/members": {
    get: operations["GroupController_groupMembers"];
  };
  "/api/groups/{id}/join": {
    post: operations["GroupController_join"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Connection: {
      userId: string;
      minecraft_uuid?: string;
    };
    User: {
      id: string;
      displayName: string;
      username: string;
      description?: string;
      pronouns?: string;
      admin: boolean;
      groups: components["schemas"]["Group"][];
      connections?: components["schemas"]["Connection"];
    };
    Group: {
      id: string;
      name: string;
      users: components["schemas"]["User"][];
    };
    UpdateUser: {
      description?: string;
      pronouns?: string;
    };
    MinecraftToken: {
      token: string;
    };
    NewGroup: {
      name: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_getHealth: {
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  UserController_getProfile: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
  UserController_getOneUser: {
    parameters: {
      path: {
        /** @description Username */
        username: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["User"];
        };
      };
    };
  };
  UserController_updateUser: {
    parameters: {
      path: {
        /** @description Username */
        username: string;
      };
    };
    /** @description Updated user parameters */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateUser"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  ConnectionController_addMinecraft: {
    /** @description payload containing the token */
    requestBody: {
      content: {
        "application/json": components["schemas"]["MinecraftToken"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  ConnectionController_removeMinecraft: {
    responses: {
      200: {
        content: never;
      };
    };
  };
  GroupController_getById: {
    parameters: {
      path: {
        /** @description Group Id */
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Group"];
        };
      };
    };
  };
  GroupController_getAll: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Group"][];
        };
      };
    };
  };
  GroupController_createGroup: {
    /** @description New Group, can omit id */
    requestBody: {
      content: {
        "application/json": components["schemas"]["NewGroup"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Group"];
        };
      };
    };
  };
  GroupController_groupMembers: {
    parameters: {
      path: {
        /** @description Group Id */
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["User"][];
        };
      };
    };
  };
  GroupController_join: {
    parameters: {
      path: {
        /** @description Group Id */
        id: string;
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Group"];
        };
      };
    };
  };
}
