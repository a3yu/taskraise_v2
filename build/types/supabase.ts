export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          fee: number
          id: number
          location: unknown | null
          location_name: string
          profile: string
          status: Database["public"]["Enums"]["order_status"]
          title: string
          transaction: number | null
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          fee: number
          id?: number
          location?: unknown | null
          location_name?: string
          profile: string
          status?: Database["public"]["Enums"]["order_status"]
          title: string
          transaction?: number | null
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          fee?: number
          id?: number
          location?: unknown | null
          location_name?: string
          profile?: string
          status?: Database["public"]["Enums"]["order_status"]
          title?: string
          transaction?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_profile_fkey1"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_transaction_fkey"
            columns: ["transaction"]
            isOneToOne: true
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          description: string
          email: string
          id: number
          location: unknown | null
          location_name: string
          name: string
          stripe_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          email?: string
          id?: number
          location?: unknown | null
          location_name?: string
          name?: string
          stripe_id?: string
        }
        Update: {
          created_at?: string
          description?: string
          email?: string
          id?: number
          location?: unknown | null
          location_name?: string
          name?: string
          stripe_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string
          full_name: string | null
          id: string
          stripe_id: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          email: string
          full_name?: string | null
          id: string
          stripe_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          email?: string
          full_name?: string | null
          id?: string
          stripe_id?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_organizations: {
        Row: {
          created_at: string
          id: number
          organization: number
          profile: string
        }
        Insert: {
          created_at?: string
          id?: number
          organization: number
          profile: string
        }
        Update: {
          created_at?: string
          id?: number
          organization?: number
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organizations_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_organizations_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string
          id: number
          order: number
          organization: number
          payment_intent: string
        }
        Insert: {
          created_at?: string
          id?: number
          order: number
          organization: number
          payment_intent?: string
        }
        Update: {
          created_at?: string
          id?: number
          order?: number
          organization?: number
          payment_intent?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_org: {
        Args: {
          organization_id: number
        }
        Returns: boolean
      }
      search_tasks_all: {
        Args: {
          lat: number
          long: number
          radius: number
          search_term: string
        }
        Returns: {
          id: number
          title: string
          description: string
          profile_id: string
          full_name: string
          email: string
          location_name: string
          amount: number
          fee: number
          stripe_id: string
        }[]
      }
      search_tasks_empty: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          title: string
          description: string
          profile_id: string
          full_name: string
          email: string
          location_name: string
          amount: number
          fee: number
          stripe_id: string
        }[]
      }
      search_tasks_location: {
        Args: {
          lat: number
          long: number
          radius: number
        }
        Returns: {
          id: number
          title: string
          description: string
          profile_id: string
          full_name: string
          email: string
          location_name: string
          amount: number
          fee: number
          stripe_id: string
        }[]
      }
      search_tasks_remoteterm: {
        Args: {
          search_term: string
        }
        Returns: {
          id: number
          title: string
          description: string
          profile_id: string
          full_name: string
          email: string
          stripe_id: string
        }[]
      }
      search_tasks_term: {
        Args: {
          search_term: string
        }
        Returns: {
          id: number
          title: string
          description: string
          profile_id: string
          full_name: string
          email: string
          location_name: string
          amount: number
          fee: number
          stripe_id: string
        }[]
      }
    }
    Enums: {
      order_status: "OPEN" | "CLAIMED" | "ONGOING" | "COMPLETED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
