import { FieldPolicy, Reference } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeyArgs = FieldPolicy<any>["keyArgs"];

export type TRelayEdge<TNode> =
  | {
    cursor?: string;
    node: TNode;
  }
  | (Reference & { cursor?: string });

export type TExistingRelay<TNode> = Readonly<{
  edges: TRelayEdge<TNode>[];
}>;

export type TIncomingRelay<TNode> = {
  edges?: TRelayEdge<TNode>[];
};

export type RelayFieldPolicy<TNode> = FieldPolicy<
  TExistingRelay<TNode> | null,
  TIncomingRelay<TNode> | null,
  TIncomingRelay<TNode> | null
>;

export function paginatedConnection<TNode extends Reference = Reference>(
  keyArgs: KeyArgs = false
): RelayFieldPolicy<TNode> {
  return {
    keyArgs,

    read(existing, { canRead, readField }) {
      if (!existing) return existing;

      const edges: TRelayEdge<TNode>[] = [];

      existing.edges.forEach((edge) => {
        // Edges themselves could be Reference objects, so it's important
        // to use readField to access the edge.edge.node property.
        if (canRead(readField("node", edge))) {
          edges.push(edge);
        }
      });

      return {
        // Some implementations return additional Connection fields, such
        // as existing.totalCount. These fields are saved by the merge
        // function, so the read function should also preserve them.
        ...getExtras(existing),
        edges,
      };
    },

    merge(existing, incoming, { args, isReference, readField }) {
      if (!existing) {
        existing = makeEmptyData();
      }

      if (!incoming) {
        return existing;
      }

      const incomingEdges = incoming.edges
        ? incoming.edges.map((edge) => {
          if (isReference((edge = { ...edge }))) {
            // In case edge is a Reference, we read out its cursor field and
            // store it as an extra property of the Reference object.
            edge.cursor = readField<string>("cursor", edge);
          }
          return edge;
        })
        : [];

      let prefix = existing.edges;
      let suffix: typeof prefix = [];

      if (args && args.paginate && args.paginate.after) {
        // This comparison does not need to use readField("cursor", edge),
        // because we stored the cursor field of any Reference edges as an
        // extra property of the Reference object.
        const index = prefix.findIndex((edge) => edge.cursor === args.paginate.after);
        if (index >= 0) {
          prefix = prefix.slice(0, index + 1);
          // suffix = []; // already true
        }
      } else if (args && args.paginate && args.paginate.before) {
        const index = prefix.findIndex((edge) => edge.cursor === args.paginate.before);
        suffix = index < 0 ? prefix : prefix.slice(index);
        prefix = [];
      } else if (incoming.edges) {
        // If we have neither args.paginate.after nor args.paginate.before, the incoming
        // edges cannot be spliced into the existing edges, so they must
        // replace the existing edges. See https://github.com/apollographql/apollo-client/issues/6592 for a motivating example.
        prefix = [];
      }

      const edges = [...prefix, ...incomingEdges, ...suffix];

      const existingExtras = getExtras(existing);
      const incomingExtras = getExtras(incoming);
      const finalTotalCount = existingExtras.totalCount || incomingExtras.totalCount; // Favor the initial totalCount as new page queries will limit the total subset based on the paginate.after/before arg

      const result = {
        ...existingExtras,
        ...incomingExtras,
        totalCount: finalTotalCount,
        hasEnded: incomingExtras.totalCount == 0,
        edges,
      };

      return result;
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getExtras = (obj: Record<string, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { edges, pageInfo, ...rest } = obj;
  return rest;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeEmptyData = (): TExistingRelay<any> => {
  return { edges: [] };
};

// Page-based pagination helper that replaces data instead of merging
export function pageBasedConnection<TNode extends Reference = Reference>(
  keyArgs: KeyArgs = ["filter"]
): RelayFieldPolicy<TNode> {
  return {
    keyArgs,

    read(existing, { canRead, readField }) {
      if (!existing) return existing;

      const edges: TRelayEdge<TNode>[] = [];

      existing.edges.forEach((edge) => {
        if (canRead(readField("node", edge))) {
          edges.push(edge);
        }
      });

      return {
        ...getExtras(existing),
        edges,
      };
    },

    merge(existing, incoming) {
      if (!incoming) {
        return existing || null;
      }

      // For page-based pagination, always replace with incoming data
      // This ensures each page shows only its data, not accumulated data
      return {
        ...getExtras(incoming),
        edges: incoming.edges || [],
      };
    },
  };
}
