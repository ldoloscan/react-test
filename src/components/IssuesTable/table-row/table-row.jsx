import React from 'react';
import { Table, Label, Header, Image } from 'semantic-ui-react'

const IssuesTableRow = ({issue}) => {
    const {
        number,
        title,
        created_at,
        updated_at,
        user,
        state
    } = issue;

    const formattedCreatedDate = new Date(created_at).toLocaleDateString();
    const formattedUpdatedDate = new Date(updated_at).toLocaleDateString();

    const issueLabels = (
        issue.labels.map(label => {
            return (
                <Label key={label.id} as='button' horizontal>
                    {label.name}
                </Label>
            );
        })
    );

    const stateLabelColor = (issue.state === 'open') ? 'green' : 'red';

    return (
        <Table.Row>
            <Table.Cell>
                <b>{number}</b>
            </Table.Cell>
            <Table.Cell>
                <Header as='h4'>{title}</Header>

                <br/>

                <div>
                    <Header as='h4' image>
                        <b>by &nbsp;</b>

                        <Image src={user.avatar_url} rounded size='mini'/>

                        <Header.Content>
                            {user.login}
                            <Header.Subheader>
                                {user.type}
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </div>
            </Table.Cell>
            <Table.Cell>{formattedCreatedDate}</Table.Cell>
            <Table.Cell>{formattedUpdatedDate}</Table.Cell>
            <Table.Cell>
                {
                    issue.labels.length === 0 && (<b>--</b>)
                }

                { issueLabels }
            </Table.Cell>
            <Table.Cell>
                <Label color={stateLabelColor}>
                    {state}
                </Label>
            </Table.Cell>
        </Table.Row>
    )
};

export default IssuesTableRow;
