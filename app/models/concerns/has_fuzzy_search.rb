module HasFuzzySearch
  extend ActiveSupport::Concern

  class_methods do
    def fuzzysearch(*fields, condition: :or)
      scope :fuzzysearch, ->(value) do
        conditions = fields.flat_map do |field|
          query = soundex(arel_attribute(field)).eq(soundex(value))
          query.or(arel_attribute(field).matches("%#{value}%"))
        end

        where(conditions.reduce(&condition))
      end
    end

    private

      def soundex(value)
        value = Arel.sql(connection.quote(value)) if value.is_a?(String)
        ::Arel::Nodes::NamedFunction.new('soundex', [value])
      end
  end
end
