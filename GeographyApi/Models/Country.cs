using System.Collections.Generic;

namespace GeographyApi.Models
{
    public class Country
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }

        public ICollection<State> States { get; set; }

    }
}