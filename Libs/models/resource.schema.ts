import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import CommonDBCollections from './common.DBcollection'
import CommonSchema from './common.schema'
import { Permission } from './permission.schema'

@Schema({ collection: CommonDBCollections.RESOURCE, timestamps: true })
export class Resource extends CommonSchema {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    name: string

    @Prop({
        required: true,
        type: String
    })
    desc: string

    @Prop({
        required: true,
        type: Permission
    })
    permissions: Permission[]
}
export const ResourceSchema = SchemaFactory.createForClass(Resource)
