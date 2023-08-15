import { SfSelect } from '@storefront-ui/react'
import { useFrappeGetDocList } from 'frappe-react-sdk'
import React, { useState } from 'react'

const BranchSelect = ({
    name,
    onChange,
    value,
    error,
    ...props
}) => {
    const { data: branchList } = useFrappeGetDocList("Branch", {
        fields: ["*"]
    })

    const focusStyle = {
      border:"1px solid #F0592A"
    }

    const [focusSelect, setFocusSelect] = useState(false);

    return (
        <>
            <SfSelect size="base" name={name} onChange={onChange} value={value} {...props} onFocus={() => setFocusSelect(true)} onBlur={() => setFocusSelect(false)} style={focusStyle}>
                <option value="">Select Branch</option>
                {(branchList ?? []).map((branch) => (
                    <option value={branch.name} key={branch.name}>
                        {branch.name}
                    </option>
                ))}
            </SfSelect>
            {
                error && <p className="text-negative-600">Please select a branch</p>
            }
        </>
    )
}

export default BranchSelect