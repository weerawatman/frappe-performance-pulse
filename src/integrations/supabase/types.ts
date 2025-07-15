export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      competency_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          kpi_merit_id: string | null
          name: string
          self_score: number | null
          supervisor_score: number | null
          weight: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          kpi_merit_id?: string | null
          name: string
          self_score?: number | null
          supervisor_score?: number | null
          weight: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          kpi_merit_id?: string | null
          name?: string
          self_score?: number | null
          supervisor_score?: number | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "competency_items_kpi_merit_id_fkey"
            columns: ["kpi_merit_id"]
            isOneToOne: false
            referencedRelation: "kpi_merit"
            referencedColumns: ["id"]
          },
        ]
      }
      culture_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          kpi_merit_id: string | null
          name: string
          self_score: number | null
          supervisor_score: number | null
          weight: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          kpi_merit_id?: string | null
          name: string
          self_score?: number | null
          supervisor_score?: number | null
          weight: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          kpi_merit_id?: string | null
          name?: string
          self_score?: number | null
          supervisor_score?: number | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "culture_items_kpi_merit_id_fkey"
            columns: ["kpi_merit_id"]
            isOneToOne: false
            referencedRelation: "kpi_merit"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string | null
          department: string
          email: string | null
          employee_id: string
          employee_name: string
          id: string
          position: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          email?: string | null
          employee_id: string
          employee_name: string
          id?: string
          position?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          email?: string | null
          employee_id?: string
          employee_name?: string
          id?: string
          position?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kpi_bonus: {
        Row: {
          approved_date: string | null
          approver_feedback: string | null
          checked_date: string | null
          checker_feedback: string | null
          created_at: string | null
          employee_id: string | null
          id: string
          rejection_reason: string | null
          status: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date: string | null
          total_weight: number | null
          updated_at: string | null
        }
        Insert: {
          approved_date?: string | null
          approver_feedback?: string | null
          checked_date?: string | null
          checker_feedback?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date?: string | null
          total_weight?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_date?: string | null
          approver_feedback?: string | null
          checked_date?: string | null
          checker_feedback?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date?: string | null
          total_weight?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kpi_bonus_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_bonus_items: {
        Row: {
          actual_result: string | null
          created_at: string | null
          id: string
          kpi_bonus_id: string | null
          kpi_item_id: string | null
          score: number | null
        }
        Insert: {
          actual_result?: string | null
          created_at?: string | null
          id?: string
          kpi_bonus_id?: string | null
          kpi_item_id?: string | null
          score?: number | null
        }
        Update: {
          actual_result?: string | null
          created_at?: string | null
          id?: string
          kpi_bonus_id?: string | null
          kpi_item_id?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kpi_bonus_items_kpi_bonus_id_fkey"
            columns: ["kpi_bonus_id"]
            isOneToOne: false
            referencedRelation: "kpi_bonus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpi_bonus_items_kpi_item_id_fkey"
            columns: ["kpi_item_id"]
            isOneToOne: false
            referencedRelation: "kpi_items"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_history: {
        Row: {
          action: string
          actor_name: string
          actor_role: string
          comments: string | null
          id: string
          kpi_bonus_id: string | null
          kpi_merit_id: string | null
          target_role: string | null
          timestamp: string | null
        }
        Insert: {
          action: string
          actor_name: string
          actor_role: string
          comments?: string | null
          id?: string
          kpi_bonus_id?: string | null
          kpi_merit_id?: string | null
          target_role?: string | null
          timestamp?: string | null
        }
        Update: {
          action?: string
          actor_name?: string
          actor_role?: string
          comments?: string | null
          id?: string
          kpi_bonus_id?: string | null
          kpi_merit_id?: string | null
          target_role?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kpi_history_kpi_bonus_id_fkey"
            columns: ["kpi_bonus_id"]
            isOneToOne: false
            referencedRelation: "kpi_bonus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpi_history_kpi_merit_id_fkey"
            columns: ["kpi_merit_id"]
            isOneToOne: false
            referencedRelation: "kpi_merit"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi_items: {
        Row: {
          category_id: string
          category_name: string
          created_at: string | null
          description: string | null
          id: string
          measurement_method: string | null
          name: string
          target: string
          weight: number
        }
        Insert: {
          category_id: string
          category_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          measurement_method?: string | null
          name: string
          target: string
          weight: number
        }
        Update: {
          category_id?: string
          category_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          measurement_method?: string | null
          name?: string
          target?: string
          weight?: number
        }
        Relationships: []
      }
      kpi_merit: {
        Row: {
          approved_date: string | null
          approver_feedback: string | null
          checked_date: string | null
          checker_feedback: string | null
          competency_weight: number | null
          created_at: string | null
          culture_weight: number | null
          employee_id: string | null
          id: string
          kpi_achievement_score: number | null
          kpi_achievement_weight: number | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date: string | null
          total_score: number | null
          updated_at: string | null
        }
        Insert: {
          approved_date?: string | null
          approver_feedback?: string | null
          checked_date?: string | null
          checker_feedback?: string | null
          competency_weight?: number | null
          created_at?: string | null
          culture_weight?: number | null
          employee_id?: string | null
          id?: string
          kpi_achievement_score?: number | null
          kpi_achievement_weight?: number | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date?: string | null
          total_score?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_date?: string | null
          approver_feedback?: string | null
          checked_date?: string | null
          checker_feedback?: string | null
          competency_weight?: number | null
          created_at?: string | null
          culture_weight?: number | null
          employee_id?: string | null
          id?: string
          kpi_achievement_score?: number | null
          kpi_achievement_weight?: number | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["kpi_status"] | null
          submitted_date?: string | null
          total_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kpi_merit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      kpi_status:
        | "not_started"
        | "draft"
        | "pending_checker"
        | "pending_approver"
        | "completed"
        | "rejected"
      kpi_type: "bonus" | "merit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      kpi_status: [
        "not_started",
        "draft",
        "pending_checker",
        "pending_approver",
        "completed",
        "rejected",
      ],
      kpi_type: ["bonus", "merit"],
    },
  },
} as const
