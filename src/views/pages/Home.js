import React, { useContext, useEffect, useState } from 'react';
// Import FhirClientContext (should contain client object after SMART verification)
import { FhirClientContext } from "../../Context/FhirClientContext";
// Import SMART Query helper function
import { SMARTRequest } from "../../utils/SMARTRequest.js";
// MUI Components
import { Typography, Box, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup, Input, Button } from '@mui/material';
// Resut Dialog Component
import ResultDialog from '../Component/ResultDialog'

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
    const [resultDialogOpen, setResultDialogOpen] = useState(false);

    const sanitizeData = () => {}
    
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    };

    const handleSubmit = () =>{
        // GET request using fetch inside useEffect React hook
        fetch('https://api.npms.io/v2/search?q=react')
        .then(response => response.json())
        .then(data => console.log(data))
        .then(setResultDialogOpen(true));
    }

    useEffect(()=>{
        Promise.all([
          // get patient data
          SMARTRequest(`Patient?_id=${client.patient.id}&_pretty=true`, client),
          // get length
          SMARTRequest(`Observation?code=http://loinc.org%7C8302-2&_pretty=true&patient=${client.patient.id}`, client),
          // get weight
          SMARTRequest(`Observation?code=http://loinc.org%7C29463-7&_pretty=true&patient=${client.patient.id}`, client),
          // get head circumference 
          SMARTRequest(`Observation?code=http://loinc.org%7C9843-4&_pretty=true&patient=${client.patient.id}`, client)
        ]).then(allResponses => {
          sanitizeData(...allResponses)
        })
      }, [])

    // useEffect(()=>{
    //     console.log(state)
    // }, [state])
    
	return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography xs={12} mx={3} mt={2} variant="h5"> Coivd Risk Assessment</Typography>
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
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>    
            <ResultDialog open={resultDialogOpen} setOpen={setResultDialogOpen}/>
        </Box>
    )
}

export default Home;