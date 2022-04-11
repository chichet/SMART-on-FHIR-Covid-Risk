import React, { useContext } from 'react';
// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";
// Import SMART Query helper function
import { SMARTRequest } from "../../utils/SMARTRequest.js";



function Home(props) {
    // FHIR Client Context
    const clientContext = useContext(FhirClientContext)
    const client = clientContext.client;

	return (
      <React.Fragment>
      </React.Fragment>
    )
}

export default Home;