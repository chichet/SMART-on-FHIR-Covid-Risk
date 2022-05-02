import React, { useContext, useEffect, useState } from 'react';
// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";
// Import SMART Query helper function
import { SMARTRequest } from "../../utils/SMARTRequest.js";

//MUI
import { Typography, Box, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup, Input } from '@mui/material';

function Home(props) {
    // FHIR Client Context
    const clientContext = useContext(FhirClientContext)
    const client = clientContext.client;
    
    const [state, setState] = useState({
        dementia: true,
        chronicHeartFailure: true,
        countHospitalization: 0,
        myocardialInfarction: true,
        kidneyDisease: true,
        COPD: true,
        stroke: true,
        glucoseMedian: 0,
        useInhibitors: true,
        gender: 'male'
    });
    
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    };

    // useEffect(()=>{
    //     console.log(state)
    // }, [state])
    
	return (
      <React.Fragment>
        <Typography mx={3} mt={2} variant="h5"> Coivd Risk Assessment</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>1. Has Dementia?</FormLabel>
                <RadioGroup row name="dementia" value={state.dementia} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>2. Has Chronic Heart Failure?</FormLabel>
                <RadioGroup row name="chronicHeartFailure" value={state.chronicHeartFailure} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }} >
                <FormLabel>3. Count of Prior Hospital Admits</FormLabel>
                <Input name="countHospitalization" type="number" value={state.countHospitalization} onChange={event => handleChange(event)}/>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>4. Has had Myocardial Infarction?</FormLabel>
                <RadioGroup row name="myocardialInfarction" value={state.myocardialInfarction} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>5. Has Kidney Disease?</FormLabel>
                <RadioGroup row name="kidneyDisease" value={state.kidneyDisease} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>6. Has COPD?</FormLabel>
                <RadioGroup row name="COPD" value={state.COPD} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>7. Has had Stroke?</FormLabel>
                <RadioGroup row name="stroke" value={state.stroke} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }} >
                <FormLabel>8. Median of Past Glucose Measurements</FormLabel>
                <Input name="glucoseMedian" type="number" value={state.glucoseMedian} onChange={event => handleChange(event)}/>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>9. Currently Using Proton Pump Inhibitors?</FormLabel>
                <RadioGroup row name="useInhibitors" value={state.useInhibitors} onChange={event => handleChange(event)}>
                    <FormControlLabel value="true" control={<Radio />} label="True" />
                    <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ mx: 3, mt: 2 }}>
                <FormLabel>10. Gender</FormLabel>
                <RadioGroup row name="gender" value={state.gender} onChange={event => handleChange(event)}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>

            
        </Box>

      </React.Fragment>
    )
}

export default Home;