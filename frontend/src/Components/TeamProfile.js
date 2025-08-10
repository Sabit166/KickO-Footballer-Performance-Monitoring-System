import React from "react";
import { useParams } from "react-router-dom";

function TeamProfile() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Team Profile: {id}</h2>
      <div className="mb-2">Coach: Coach A</div>
      <div className="mb-2">Stadium: Bangabandhu Stadium</div>
      <div className="mt-4">
        <h3 className="font-semibold">Players:</h3>
        <ul className="list-disc list-inside">
          <li>Sabbir (Midfielder)</li>
          <li>Rasel (Forward)</li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Matches:</h3>
        <ul className="list-disc list-inside">
          <li>vs Kings (2-1 Win)</li>
          <li>vs Tigers (0-0 Draw)</li>
        </ul>
      </div>
    </div>
  );
}

export default TeamProfile;
