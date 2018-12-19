export interface IZkillboardLossesPublicResponse {
    killmail_id: number;
    killmail_time: number;
    solar_system_id: number;
    moon_id: number;
    victim: {
        ship_type_id: number;
        character_id: number;
        character_name: string;
        corporation_id: number;
        corporation_name: number;
        alliance_id: number;
        alliance_name: string;
        faction_id: number;
        faction_name: string;
        damage_taken: string;
    };
}