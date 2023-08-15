import { SfSelect } from '@storefront-ui/react'
import { useFrappeGetDocList } from 'frappe-react-sdk'
import React from 'react'

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
    return (
        <>
            <SfSelect size="base" name={name} onChange={onChange} value={value} {...props} className='focus:ring-[#F0592A] hover:ring-[#F0592A] active:ring-[#F0592A]'>
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