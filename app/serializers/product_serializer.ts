import BaseSerializerBuilder from './base_serializer_builder.ts';

const defaultProps = {
  attributes: ['category', 'description', 'image', 'price', 'title'],
  keyForAttribute: 'snake_case',
  nullIfMissing: true,
  pluralizeType: false,
};

class SerializerBuilder extends BaseSerializerBuilder {
  constructor() {
    super();
    this.serializerName = 'product';
    this.serializerProps = defaultProps;
  }
}

const builder = new SerializerBuilder();
const ProductSerializer = builder.build();

export default ProductSerializer;
export { SerializerBuilder };
