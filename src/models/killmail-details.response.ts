export interface KillmailDetailsResponse{
    attackers: [
        {
          character_id: number;
          corporation_id: number;
          damage_done: number;
          final_blow: boolean;
          security_status: number;
          ship_type_id: number;
          weapon_type_id: number;
        }
      ],
      killmail_id: number;
      killmail_time: string;
      solar_system_id: number;
      victim: {
        character_id: number;
        corporation_id: number;
        damage_taken: number;
        items: any[],
        ship_type_id: number;
      }
}