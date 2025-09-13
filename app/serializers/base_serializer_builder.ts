import { Serializer as JSONAPISerializer } from 'jsonapi-serializer';

class BaseSerializerBuilder {
  serializerName: string;
  serializerProps: { meta?: unknown, attributes: Array<string> };

  addMeta(key: string, value: unknown) {
    this.serializerProps.meta = this.serializerProps.meta || {};
    this.serializerProps.meta[key] = value;
  }

  // Ref: https://github.com/SeyZ/jsonapi-serializer/blob/master/test/serializer.js
  addAssociation(key: string, value: object) {
    this.serializerProps.attributes.push(key);
    this.serializerProps[key] = value;
  }

  build() {
    return new JSONAPISerializer(this.serializerName, this.serializerProps);
  }
}

export default BaseSerializerBuilder;
