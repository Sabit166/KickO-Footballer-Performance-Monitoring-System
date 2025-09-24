CREATE PROCEDURE `sp_training_performance_metrics`(IN p_player_id VARCHAR(20))
BEGIN
    IF p_player_id IS NULL OR p_player_id = '' THEN
        SELECT player_id,
               `day`,
                            
               passing_accuracy,
               sprint_count,
               shots_on_target
          FROM training_records
         ORDER BY `day` ASC;
    ELSE
        SELECT player_id,
               `day`,
               distance_covered,
               passing_accuracy,
               sprint_count,
               shots_on_target
          FROM training_records
         WHERE player_id = p_player_id
         ORDER BY `day` ASC;
    END IF;
END$$

DELIMITER;