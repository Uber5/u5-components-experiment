// @flow
import * as React from 'react'

export default ({ children }: { children: React.Node }): React$Element<"div"> => (
  <div className="buttons__group">
    {children}
  </div>
)
