package com.wildlens.wildlesnApi.wildlensApi.repository;
import com.wildlens.wildlesnApi.wildlensApi.model.InfoSpecies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfoSpeciesRepository extends JpaRepository<InfoSpecies, Long>{
}
